import { createPortal } from 'react-dom'

export default function VideoModal({ children, visible, handleCloseVideoModal, maskCloseable }) {
  function handleOnMaskClick() {
    if (maskCloseable) handleCloseVideoModal?.()
  }

  if (visible === false) {
    return null
  }

  return createPortal(
    <div className="popup-video" onClick={handleOnMaskClick}>
      <div className="wrap">{children}</div>

      <div className="close" onClick={handleCloseVideoModal} />
    </div>,
    document.body,
  )
}
