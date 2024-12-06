import { Pagination } from 'antd';

export default function GlobalPagination({dispatch,totalCount}) {
  return (
    <div className="flex justify-end bg-semiGray p-1 rounded-lg">
    <Pagination
      responsive={true}
      showLessItems={true}
      showSizeChanger={false}
      defaultCurrent={1}
      onChange={(page, pageSize) => {
        dispatch({
          type: "paginate",
          payload: {
            current: page,
            pageSize,
          },
        });
      }}
      total={totalCount}
    />
  </div>
  )
}
