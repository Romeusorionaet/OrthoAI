import SyncLoader from 'react-spinners/SyncLoader'
import Image from 'next/image'

export function CPLoading({ loading }: { loading: boolean }) {
  return (
    <div
      data-value={loading}
      className="fixed bottom-1 right-4 data-[value=false]:hidden md:bottom-10 md:left-10"
    >
      <div className="blur-sm">
        <SyncLoader color="#fff" size={20} data-value={loading} />
      </div>
      <Image
        height={100}
        width={100}
        src="/logo/logo.png"
        alt="logo"
        className="inline h-20 w-20"
      />
    </div>
  )
}
