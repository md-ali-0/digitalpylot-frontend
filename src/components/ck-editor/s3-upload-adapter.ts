import { mediaApi } from "@/redux/features/media/mediaApi";
import { store } from "@/redux/store";
import fileObjectToLink from "@/utils/fileObjectToLink";
import { $message } from "@/utils/message-service";

export class S3UploadAdapter {
  private loader: any;
  private setProgressList: any;

  constructor(loader: any, setProgressList: any) {
    this.loader = loader;
    this.setProgressList = setProgressList;
  }

  async upload() {
    const file = await this.loader.file;
    const hide = $message.loading(`Uploading ${file.name}...`, 0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // We explicitly dispatch the initiate action from the store to usage the RTK Query mutation
      // outside of a React component.
      const result = await store
        .dispatch(mediaApi.endpoints.uploadMedia.initiate(formData))
        .unwrap();

      const url = fileObjectToLink(result);

      $message.success(`${file.name} uploaded successfully`);
      hide();

      return {
        default: url,
      };
    } catch (error: any) {
      console.error("Upload failed:", error);
      const errorMsg =
        error?.data?.message || error?.message || "Upload failed";
      $message.error(`${file.name}: ${errorMsg}`);
      hide();
      throw error;
    }
  }

  abort() {
    // Media API via RTK Query doesn't support easy cancellation of in-flight requests here
    // without tracking the promise/abort controller manually.
    // For now, we leave this empty as is common in simple implementations.
  }
}
