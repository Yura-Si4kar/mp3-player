import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { SETTINGS_ROUTE } from "../utils/consts";
import { ButtonGroup } from "react-bootstrap";
import MyButton from "../components/UI/MyButton";
import AlbumsList from "../components/albums/AlbumsList";
import { Context } from "../context";
import { observer } from "mobx-react-lite";
import { useTimeFunction } from "../hooks/useTimeFunction";
import { greetingText } from "../utils/greatingText";
import AlarmClock from "../components/modals/AlarmClock";
import Timer from "../components/modals/Timer";

export default observer(function Home() {
  const navigate = useNavigate();
  const [showAlarm, setShowAlarm] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const { gallery } = useContext(Context);
  const { hours } = useTimeFunction();
  const greeting = useMemo(() => greetingText(hours), [hours]);

  const openAlarm = () => {
    setShowAlarm(true);
  };

  const closeAlarm = () => {
    setShowAlarm(false);
  };

  const openTimer = () => {
    setShowTimer(true);
  };

  const closeTimer = () => {
    setShowTimer(false);
  };

  const openSettingsPage = () => {
    navigate(SETTINGS_ROUTE);
  };

  return (
    <section className="home-section">
      <div className="header-section">
        <h1 className="greeting-text">{greeting}</h1>
        <ButtonGroup className="home-buttons">
          <MyButton variant={"link"} onClick={openAlarm}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_8_51)">
                <path
                  d="M35 29.75H38.5V33.25H3.5V29.75H7V17.5C7 13.787 8.475 10.226 11.1005 7.60051C13.726 4.975 17.287 3.5 21 3.5C24.713 3.5 28.274 4.975 30.8995 7.60051C33.525 10.226 35 13.787 35 17.5V29.75ZM31.5 29.75V17.5C31.5 14.7152 30.3938 12.0445 28.4246 10.0754C26.4555 8.10625 23.7848 7 21 7C18.2152 7 15.5445 8.10625 13.5754 10.0754C11.6062 12.0445 10.5 14.7152 10.5 17.5V29.75H31.5ZM15.75 36.75H26.25V40.25H15.75V36.75Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_8_51">
                  <rect width="42" height="42" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </MyButton>
          <MyButton variant={"link"} onClick={openTimer}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_8_54)">
                <path
                  d="M21 3.5C30.6652 3.5 38.5 11.3348 38.5 21C38.5 30.6652 30.6652 38.5 21 38.5C11.3348 38.5 3.5 30.6652 3.5 21H7C7 28.7315 13.2685 35 21 35C28.7315 35 35 28.7315 35 21C35 13.2685 28.7315 7 21 7C16.688 7 12.831 8.9495 10.2637 12.0138L14 15.75H3.5V5.25L7.78225 9.5305C10.99 5.838 15.722 3.5 21 3.5ZM22.75 12.25V20.2738L28.4253 25.949L25.949 28.4253L19.25 21.7227V12.25H22.75Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_8_54">
                  <rect width="42" height="42" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </MyButton>
          <MyButton
            variant={"link"}
            className="setting-button"
            onClick={openSettingsPage}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 34 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.84498 26.75C1.10521 25.4707 0.530147 24.103 0.133484 22.6795C0.996772 22.2404 1.72177 21.5711 2.22829 20.7456C2.7348 19.92 3.00307 18.9705 3.00344 18.0019C3.0038 17.0334 2.73623 16.0837 2.23034 15.2577C1.72444 14.4318 0.999943 13.762 0.136984 13.3222C0.928047 10.4618 2.43426 7.84991 4.51373 5.73249C5.3259 6.26051 6.26832 6.55353 7.2367 6.57911C8.20507 6.60469 9.16165 6.36185 10.0006 5.87745C10.8395 5.39305 11.528 4.68599 11.99 3.83452C12.4519 2.98304 12.6693 2.02035 12.618 1.053C15.4917 0.310334 18.5071 0.311539 21.3802 1.0565C21.3294 2.02383 21.5472 2.98638 22.0095 3.83761C22.4718 4.68884 23.1606 5.39558 23.9997 5.8796C24.8388 6.36363 25.7954 6.60607 26.7637 6.58011C27.732 6.55415 28.6743 6.26079 29.4862 5.73249C30.4995 6.76499 31.399 7.93925 32.155 9.25C32.9127 10.5607 33.4797 11.9275 33.8665 13.3205C33.0032 13.7596 32.2782 14.4289 31.7717 15.2544C31.2652 16.08 30.9969 17.0295 30.9965 17.998C30.9962 18.9666 31.2637 19.9163 31.7696 20.7422C32.2755 21.5682 33 22.238 33.863 22.6777C33.0719 25.5381 31.5657 28.1501 29.4862 30.2675C28.6741 29.7395 27.7317 29.4465 26.7633 29.4209C25.7949 29.3953 24.8383 29.6381 23.9994 30.1225C23.1605 30.6069 22.472 31.314 22.01 32.1655C21.5481 33.0169 21.3307 33.9796 21.382 34.947C18.5083 35.6897 15.4928 35.6884 12.6197 34.9435C12.6706 33.9762 12.4528 33.0136 11.9905 32.1624C11.5282 31.3111 10.8394 30.6044 10.0003 30.1204C9.16121 29.6364 8.20458 29.3939 7.23625 29.4199C6.26793 29.4458 5.32567 29.7392 4.51373 30.2675C3.47947 29.2121 2.58277 28.0303 1.84498 26.75ZM11.75 27.093C13.6148 28.1686 15.017 29.8948 15.6875 31.9405C16.5607 32.0227 17.4375 32.0245 18.3107 31.9422C18.9817 29.8962 20.3845 28.17 22.25 27.0947C24.1141 26.0162 26.3109 25.6641 28.4187 26.106C28.9262 25.392 29.3637 24.6307 29.7277 23.8345C28.2917 22.2305 27.4984 20.1529 27.5 18C27.5 15.795 28.3225 13.7352 29.7277 12.1655C29.3612 11.3695 28.9218 10.6091 28.4152 9.894C26.3087 10.3355 24.1134 9.98408 22.25 8.907C20.3851 7.8314 18.983 6.10522 18.3125 4.05949C17.4392 3.97725 16.5625 3.9755 15.6892 4.05775C15.0183 6.10375 13.6155 7.82997 11.75 8.90525C9.88585 9.9838 7.68907 10.3359 5.58123 9.894C5.07472 10.6085 4.63646 11.369 4.27223 12.1655C5.70823 13.7695 6.50153 15.8471 6.49998 18C6.49998 20.205 5.67748 22.2647 4.27223 23.8345C4.63881 24.6305 5.07818 25.3909 5.58473 26.106C7.69124 25.6645 9.8866 26.0159 11.75 27.093ZM17 23.25C15.6076 23.25 14.2722 22.6969 13.2877 21.7123C12.3031 20.7277 11.75 19.3924 11.75 18C11.75 16.6076 12.3031 15.2723 13.2877 14.2877C14.2722 13.3031 15.6076 12.75 17 12.75C18.3924 12.75 19.7277 13.3031 20.7123 14.2877C21.6969 15.2723 22.25 16.6076 22.25 18C22.25 19.3924 21.6969 20.7277 20.7123 21.7123C19.7277 22.6969 18.3924 23.25 17 23.25ZM17 19.75C17.4641 19.75 17.9092 19.5656 18.2374 19.2374C18.5656 18.9092 18.75 18.4641 18.75 18C18.75 17.5359 18.5656 17.0907 18.2374 16.7626C17.9092 16.4344 17.4641 16.25 17 16.25C16.5359 16.25 16.0907 16.4344 15.7625 16.7626C15.4344 17.0907 15.25 17.5359 15.25 18C15.25 18.4641 15.4344 18.9092 15.7625 19.2374C16.0907 19.5656 16.5359 19.75 17 19.75Z"
                fill="white"
              />
            </svg>
          </MyButton>
        </ButtonGroup>
      </div>
      <AlbumsList albums={gallery.albums} />
      <AlarmClock show={showAlarm} hide={closeAlarm} />
      <Timer show={showTimer} hide={closeTimer} />
    </section>
  );
});
