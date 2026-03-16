/* eslint-disable @typescript-eslint/no-explicit-any */
export const RenderJson = ({ data }: { data: any }) => {
  if (typeof data === "object" && data !== null) {
    if (Array.isArray(data)) {
      return (
        <ul>
          {data.map((item, i) => (
            <li key={i}>
              <RenderJson data={item} />
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <div style={{ marginLeft: 20 }}>
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <strong>{key}: </strong>
              <RenderJson data={value} />
            </div>
          ))}
        </div>
      );
    }
  }
  return <span>{String(data)}</span>;
};
