import { CameraModal } from '../components/CameraModal/CameraModal'
import { ChatHeader } from '../components/ChatHeader/ChatHeader'
import { Conversation } from '../components/Conversation/Conversation'
import { ImagePreviewModal } from '../components/ImagePreviewModal/ImagePreviewModal'
import { MessageInput } from '../components/MessageInput/MessageInput'
import { MessageSidebar } from '../components/MessageSidebar/MessageSidebar'
import { WelcomeScreen } from '../components/WelcomeScreen/WelcomeScreen'
import { useMessages } from '../hooks/useMessages'
import './AdminMessages.css'

export function AdminMessages() {
  const {
    activeEmployee,
    activeMessages,
    filteredEmployees,
    searchTerm,
    roleFilter,
    draftMessage,
    attachmentMenuOpen,
    emojiOpen,
    cameraOpen,
    imagePreviewOpen,
    selectedImageUrl,
    imageCaption,
    isRecordingVoice,
    recordingPreviewReady,
    recordingSeconds,
    setSearchTerm,
    setRoleFilter,
    setDraftMessage,
    setAttachmentMenuOpen,
    setEmojiOpen,
    setCameraOpen,
    setImagePreviewOpen,
    setImageCaption,
    openConversation,
    sendTextMessage,
    sendAttachment,
    captureCameraImage,
    sendPreviewImage,
    addEmoji,
    tickVoiceRecorder,
    startVoiceRecording,
    stopVoiceRecording,
    cancelVoiceRecording,
    sendVoiceRecording,
  } = useMessages()

  return (
    <div className="message-page-shell">
      <MessageSidebar
        employees={filteredEmployees}
        activeEmployeeId={activeEmployee?.id ?? null}
        searchTerm={searchTerm}
        roleFilter={roleFilter}
        onSearchChange={setSearchTerm}
        onRoleFilterChange={setRoleFilter}
        onSelectEmployee={openConversation}
      />

      <div className="message-chat-shell">
        {!activeEmployee ? (
          <WelcomeScreen />
        ) : (
          <>
            <ChatHeader employee={activeEmployee} />
            <Conversation messages={activeMessages} />
            <MessageInput
              draftMessage={draftMessage}
              attachmentMenuOpen={attachmentMenuOpen}
              emojiOpen={emojiOpen}
              isRecordingVoice={isRecordingVoice}
              recordingPreviewReady={recordingPreviewReady}
              recordingSeconds={recordingSeconds}
              onDraftChange={setDraftMessage}
              onSend={sendTextMessage}
              onAttachmentMenuToggle={() => {
                setAttachmentMenuOpen(!attachmentMenuOpen)
                setEmojiOpen(false)
              }}
              onAttachmentSelect={sendAttachment}
              onAttachmentClose={() => setAttachmentMenuOpen(false)}
              onEmojiToggle={() => {
                setEmojiOpen(!emojiOpen)
                setAttachmentMenuOpen(false)
              }}
              onEmojiPick={addEmoji}
              onVoiceStart={startVoiceRecording}
              onVoiceStop={stopVoiceRecording}
              onVoiceCancel={cancelVoiceRecording}
              onVoiceSend={sendVoiceRecording}
              onVoiceTick={tickVoiceRecorder}
            />
          </>
        )}
      </div>

      <CameraModal
        open={cameraOpen}
        onCapture={captureCameraImage}
        onClose={() => setCameraOpen(false)}
      />

      <ImagePreviewModal
        open={imagePreviewOpen}
        imageUrl={selectedImageUrl}
        caption={imageCaption}
        onCaptionChange={setImageCaption}
        onCancel={() => setImagePreviewOpen(false)}
        onSend={sendPreviewImage}
      />
    </div>
  )
}
