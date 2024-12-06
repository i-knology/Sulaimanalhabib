export default function NoData({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) {
  return (
    <div className="flex flex-col items-center w-full my-4">
      <img src="/illustrations/noData.svg" alt="" />
      <p className={subTitle ? "text-content" : "text-black"}>{title}</p>
      <p className="text-content">{subTitle}</p>
    </div>
  );
}
