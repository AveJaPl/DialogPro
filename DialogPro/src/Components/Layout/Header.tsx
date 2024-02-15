import { IoMdClose } from 'react-icons/io'
import logo from '../../Logo/logo.png'

type HeaderProps = {
  handleClose: () => void
}

const Header = (props: HeaderProps) => {
  return (
    <div className={`w-full flex border-b-2 p-2`}>
      <div className={`w-1/6`}>
        <img src={logo} alt="logo" className={`w-10`} />
      </div>
      <div className={`flex flex-col w-2/3`}>
        <strong className={`text-sm`}>AIDialog Pro</strong>
        <span className={`text-xs`}>W czym ci pomóc?</span>
      </div>
      <div className={`p-2 w-1/6 flex justify-end items-start`}>
        <button onClick={props.handleClose} className={`text-2xl`}>
          <IoMdClose />
        </button>
      </div>
    </div>
  )
}
 
export default Header
