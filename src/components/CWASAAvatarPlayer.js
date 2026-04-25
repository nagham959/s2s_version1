import React, { useEffect, useRef, useState } from 'react';

const DEFAULT_SIGML = `<sigml>
  <hns_sign gloss="test">
    <hamnosys_nonmanual></hamnosys_nonmanual>
    <hamnosys_manual>
      <hamfist/>
      <hamthumboutmod/>
      <hamextfingero/>
      <hampalml/>
      <hamshouldertop/>
      <hammoveo/>
      <hamsmallmod/>
    </hamnosys_manual>
  </hns_sign>
</sigml>`;

const CWASAAvatarPlayer = ({
  sigml = '',
  playNonce = 0,
  className = '',
  title = 'ALSL Avatar',
}) => {
  const iframeRef = useRef(null);
  const [isFrameReady, setIsFrameReady] = useState(false);

  const sendSigml = () => {
    const frameWindow = iframeRef.current?.contentWindow;
    const xml = (sigml || DEFAULT_SIGML).trim();

    if (!frameWindow || !xml) return;

    if (typeof frameWindow.playSiGML === 'function') {
      frameWindow.playSiGML(xml);
      return;
    }

    frameWindow.postMessage({ type: 'PLAY_SIGML', payload: xml }, window.location.origin);
  };

  useEffect(() => {
    if (!isFrameReady) return;
    const timer = setTimeout(() => {
      sendSigml();
    }, 300);

    return () => clearTimeout(timer);
    // playNonce allows replaying the same XML without changing the string.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFrameReady, sigml, playNonce]);

  return (
    <iframe
      ref={iframeRef}
      src="/alsl-avatar/embed.html"
      title={title}
      className={className}
      onLoad={() => setIsFrameReady(true)}
      style={{ border: 0 }}
      allow="autoplay"
    />
  );
};

export default CWASAAvatarPlayer;
