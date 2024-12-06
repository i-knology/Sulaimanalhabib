import { Radio } from 'antd'
import HrDivider from '../ui/HrDivider'

export default function MemberRadio() {
  return (
    <div className="flex flex-col">
    <div>
      <Radio className="my-1 flex w-full">
        <div className="flex items-center w-full">
          <div>
            <img className="w-3/4" src="/illustrations/profile-image.svg" alt="" />
          </div>
          <span>محمد مصطفي علي</span>
        </div>
      </Radio>
      <HrDivider/>
    </div>
  </div>
  )
}
