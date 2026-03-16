/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Col, Tooltip } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Reload, { refetchArr } from "./reload";

type Props = {
  arrOfOption: string[];
  refetch?: () => any;
  refetchArr?: refetchArr[];
  reloaderSize?: SizeType;
};

const BreadCrumb = ({
  arrOfOption,
  refetch,
  refetchArr,
  reloaderSize,
}: Props) => {
  const router = useRouter();

  const breadcrumbItems = [
    {
      title: (
        <>
          <ArrowLeftOutlined
            onClick={() => router.back()}
            className="icon_hover"
            style={{
              padding: "4px",
              borderRadius: "2px",
            }}
          />
          <Link href="/">
            <HomeOutlined />
          </Link>
        </>
      ),
    },
    {
      title: <Link href="/">DASHBOARD</Link>,
    },
    ...arrOfOption.map((item) => ({
      title: item.toUpperCase(),
      key: item,
    })),
  ];

  return (
    <div
      style={{
        padding: "10px",
        marginBottom: "20px",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Breadcrumb
        separator=">"
        items={[
          ...breadcrumbItems,
          {
            title: (
              <ArrowRightOutlined
                className="icon_hover"
                style={{
                  padding: "4px",
                  marginLeft: "5px",
                  borderRadius: "2px",
                }}
                onClick={() => router.forward()}
              />
            ),
          },
        ]}
      />
      {refetch || refetchArr ? (
        <Col>
          <Tooltip title="Refresh">
            <Reload
              refetch={refetch}
              refetchArr={refetchArr}
              reloaderSize={reloaderSize}
            />
          </Tooltip>
        </Col>
      ) : (
        ""
      )}
    </div>
  );
};

export default BreadCrumb;
