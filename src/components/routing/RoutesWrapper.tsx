import { ReactNode, useEffect, useRef, useState } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { TOAST_DEFAULT_PROPS } from 'utils/constants';

interface RoutesWrapperProps {
  children?: ReactNode;
}

export const RoutesWrapper = ({ children }: RoutesWrapperProps) => {
  const location = useLocation();
  const progressBar = useRef<LoadingBarRef>(null);

  const progressBarStartingValue = 0;
  const progressBarRefreshRate = 1000;

  const [prevLocation, setPrevLocation] = useState<string>('');

  useEffect(() => {
    setPrevLocation(location?.pathname);
    progressBar?.current?.continuousStart(
      progressBarStartingValue,
      progressBarRefreshRate
    );

    if (location?.pathname === prevLocation) setPrevLocation('');
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTimeout(() => progressBar?.current?.complete(), 500);
  }, [prevLocation]);

  return (
    <>
      <LoadingBar ref={progressBar} color="var(--red)" />
      <ToastContainer {...TOAST_DEFAULT_PROPS} />
      <Routes>{children}</Routes>
    </>
  );
};
