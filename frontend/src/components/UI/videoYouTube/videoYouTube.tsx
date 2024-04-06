import React, { useEffect, useRef } from 'react';

const VideoYouTube = () => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Устанавливаем таймер для перерендеринга после 39 секунд
    timerRef.current = window.setTimeout(() => {
      // Перезагрузка видео
      if (videoRef.current) {
        videoRef.current.src += '';
      }
    }, 39000);

    // Очищаем таймер при размонтировании компонента
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Ссылка на YouTube видео с параметрами autoplay, mute, зацикливанием и скрытием плашек и логотипа
  const videoUrl = 'https://www.youtube.com/embed/hxLfbiP0yec?autoplay=1&mute=1&loop=1&modestbranding=1';

  return (
    <div style={{ position: 'relative', paddingTop: '56.25%' }}>
      <iframe
        ref={videoRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        src={videoUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoYouTube;
