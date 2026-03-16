/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useEffect, useState } from "react";

export type refetchArr = () => any;
type Props = {
  refetch?: () => any;
  refetchArr?: refetchArr[];
  reloaderSize?: SizeType;
};

export default function Reload({ refetch, refetchArr, reloaderSize }: Props) {
  const handleRefetch = () => {
    if (refetch) refetch();
    if (refetchArr?.length) {
      refetchArr.forEach((refetchItem) => {
        refetchItem();
      });
    }
  };
  const [tempState, setTempState] = useState<number>();

  useEffect(() => {
    const clickDelay = setTimeout(() => {
      if (tempState) handleRefetch();
    }, 1000);
    return () => clearTimeout(clickDelay);
  }, [tempState]);

  return (
    <Tooltip title="Reload">
      {" "}
      <Button
        style={{ borderRadius: "30px" }}
        onClick={() => {
          setTempState(Math.random());
        }}
        size={reloaderSize || "middle"}
        type="text"
      >
        <ReloadOutlined
          style={{
            fontWeight: "bolder",
            fontSize: "20px",
            color: "gray",
          }}
        />
      </Button>
    </Tooltip>
  );
}
