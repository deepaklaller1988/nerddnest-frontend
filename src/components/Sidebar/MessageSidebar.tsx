import MessageSearchBar from '../SearchBar/MessageSearchBar'
import { TbMessageCircleOff } from "react-icons/tb";
import { capitalizeName } from '@/utils/capitalizeName';
import { FaEdit } from "react-icons/fa";
import Image from 'next/image';


export default function MessageSidebar({ chatData, activeChatId, onChatSelect, onIconClick, isHandleClickActive }: any) {
  return (
    <div className="w-1/4 bg-[var(--sections)] border-r border-white/20">
      <h2 className="flex flex-row gap-4 text-xl font-semibold text-white p-4 py-7 pb-8">
        Messages

        {!isHandleClickActive && <FaEdit size={16} fill='white' onClick={onIconClick} />}
      </h2>
      <MessageSearchBar />

      {chatData && chatData.length > 0 ? chatData.map((item: any, index: any) => (
        <div key={index}
          onClick={() => onChatSelect(item.id)}
          className={`space-y-2 border-b border-white/5 hover:bg-white/5 bg-white/10 duration-[.3s]
            ${activeChatId === item.id ? 'border-r-4 border-r-white' : ''
            }`}
        >
          <div className="flex items-center space-x-2 p-4 cursor-pointer" onClick={() => item.id}>
            <div className="w-10 h-10 min-w-10 min-h-10 rounded-full overflow-hidden border border-white">
              <Image src={item?.image || "/profile-avatar-legacy-50.png"} alt="dp" width={50}
                height={50} />
            </div>
            <div className="w-full relative">
              <p className="font-semibold text-white">{capitalizeName(item.conversation_name)}</p>
              {/* <p className="">You: hii</p> */}
              {/* <p className="text-xs absolute bottom-0 right-0">Tuesday</p> */}
            </div>
          </div>
        </div>
      ))

        :
        <div className='mt-10 flex flex-col justify-center items-center'>
          <TbMessageCircleOff size={40} />
          <h3>No Messages</h3>
          <p>When you have new messages, they will appear here.</p>
        </div>
      }

    </div>

  )
}
