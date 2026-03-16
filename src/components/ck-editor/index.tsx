/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  AutoMediaEmbed,
  Autosave,
  BlockQuote,
  Bold,
  Bookmark,
  ClassicEditor,
  Code,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Fullscreen,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageEditing,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  ImageUtils,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  PageBreak,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  PlainTableOutput,
  RemoveFormat,
  SimpleUploadAdapter,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableLayout,
  TableProperties,
  TableToolbar,
  // TextPartLanguage,
  TextTransformation,
  TodoList,
  Underline,
  WordCount,
} from "ckeditor5";

import { useEffect, useMemo, useRef, useState } from "react";

import "ckeditor5/ckeditor5.css";
import { S3UploadAdapter } from "./s3-upload-adapter";

interface CKEditorProps {
  value?: string;
  onChange: (data: string) => void;
}

export default function Editor({ value, onChange }: CKEditorProps) {
  const editorContainerRef = useRef(null);
  const [, setFileProgressList] = useState<
    Array<{ name: string; progress: number; status: string; url?: string }>
  >([]);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [editorInstance, setEditorInstance] = useState<any>(null);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        extraPlugins: [CustomUploadPlugin],
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "findAndReplace",
            "selectAll",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "highlight",
            "subscript",
            "superscript",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "link",
            "blockQuote",
            "code",
            "removeFormat",
            "|",
            "alignment",
            "lineHeight",
            "bulletedList",
            "numberedList",
            "todoList",
            "outdent",
            "indent",
            "|",
            "insertImage",
            "mediaEmbed",
            "insertTable",
            "|",
            "horizontalLine",
            "pageBreak",
            "|",
            "specialCharacters",
            "findAndReplace",
            "|",
            "sourceEditing",
            "fullscreen",
          ],
          shouldNotGroupWhenFull: true,
        },
        alignment: {
          options: ["left", "center", "right", "justify"],
        },
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          BlockQuote,
          Bold,
          Bookmark,
          Code,
          Essentials,
          FindAndReplace,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          Fullscreen,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          HtmlComment,
          HtmlEmbed,
          ImageBlock,
          ImageCaption,
          ImageEditing,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          ImageUtils,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          MediaEmbed,
          AutoMediaEmbed,
          PageBreak,
          Paragraph,
          PasteFromMarkdownExperimental,
          PasteFromOffice,
          PlainTableOutput,
          RemoveFormat,
          SimpleUploadAdapter,
          SourceEditing,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          Strikethrough,
          Style,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableLayout,
          TableProperties,
          TableToolbar,
          // TextPartLanguage,
          TextTransformation,
          TodoList,
          Underline,
          WordCount,
        ],
        fontFamily: {
          options: [
            "SolaimanLipi, sans-serif",
            "Nikosh, sans-serif",
            "Siyam Rupali, sans-serif",
            "Kalpurush, sans-serif",
            "default",
            "Arial, Helvetica, sans-serif",
            "Times New Roman, Times, serif",
          ],
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        fullscreen: {
          onEnterCallback: (container: HTMLElement) =>
            container.classList.add(
              "editor-container",
              "editor-container_classic-editor",
              "editor-container_include-style",
              "editor-container_include-word-count",
              "editor-container_include-fullscreen",
              "main-container",
            ),
        },
        heading: {
          options: [
            {
              model: "paragraph",
              view: "p",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true,
            },
          ],
        },
        image: {
          toolbar: [
            "toggleImageCaption",
            "imageTextAlternative",
            "|",
            "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
            "|",
            "resizeImage",
          ],
        },
        initialData: "",
        licenseKey: "GPL",
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
        placeholder: "Start writing your article...",
        style: {
          definitions: [
            {
              name: "Article category",
              element: "h3",
              classes: ["category"],
            },
            {
              name: "Title",
              element: "h2",
              classes: ["document-title"],
            },
            {
              name: "Subtitle",
              element: "h3",
              classes: ["document-subtitle"],
            },
            {
              name: "Info box",
              element: "p",
              classes: ["info-box"],
            },
            {
              name: "CTA Link Primary",
              element: "a",
              classes: ["button", "button--green"],
            },
            {
              name: "CTA Link Secondary",
              element: "a",
              classes: ["button", "button--black"],
            },
            {
              name: "Marker",
              element: "span",
              classes: ["marker"],
            },
            {
              name: "Spoiler",
              element: "span",
              classes: ["spoiler"],
            },
          ],
        },
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
        mediaEmbed: {
          previewsInData: true,
          emoveProviders: ["instagram"],
        },
      },
    };
  }, [isLayoutReady]);

  function CustomUploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any,
    ) => {
      return new S3UploadAdapter(loader, setFileProgressList);
    };
  }

  useEffect(() => {
    if (editorInstance && value !== editorInstance.getData()) {
      editorInstance.setData(value || "");
    }
  }, [value, editorInstance]);

  return (
    <>
      <div
        className="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-word-count editor-container_include-fullscreen"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {editorConfig && (
              <CKEditor
                editor={ClassicEditor}
                data={value || ""}
                // @ts-ignore
                config={editorConfig}
                onReady={(editor) => setEditorInstance(editor)}
                onChange={(event, editor) => onChange(editor.getData())}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
