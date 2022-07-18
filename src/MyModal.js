import styles from "./Modal.module.css";
import React, { useState, useEffect, useMemo } from "react";
import Chart from "./chart/chart.js";
import { AiFillCloseCircle } from "react-icons/ai";
import Modal from 'react-bootstrap/Modal';

const Cardmodal = (props) => {
  return <div className={styles.card}>{props.children}</div>;
};

const MyModal = (props) => {
  const fullDateHistory = useMemo(
    () =>
      props.coinHistory.prices.map((date) =>
        new Date(date[0]).toLocaleDateString()
      ),
    [props.coinHistory.prices]
  );
  const fullPriceHistory = useMemo(
    () => props.coinHistory.prices.map((date) => date[1]),
    [props.coinHistory.prices]
  );

  const [time, setTime] = useState(365);
  const [dateHistory, setDateHistory] = useState(fullDateHistory);
  const [priceHistory, setPriceHistory] = useState(fullPriceHistory);

  useEffect(() => {
    setDateHistory(fullDateHistory.slice(365 - time));
    setPriceHistory(fullPriceHistory.slice(365 - time));
  }, [time, fullDateHistory, fullPriceHistory]);

  return (
    <React.Fragment>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
          <Modal.Body className={styles.card}>
            <select
                aria-label="Default select example"
                name="time"
                id="time"
                value={time}
                onChange={(e) => setTime(+e.target.value)}
                className={styles.select}
                >
                    <option value="365">365d</option>
                    <option value="180">6mo</option>
                    <option value="90">3mo</option>
                    <option value="30">1mo</option>
                    <option value="7">7d</option>
                </select>
                <AiFillCloseCircle
                  className={styles["close-icon"]}
                  onClick={() => props.onHide(true)}
                />
                <Chart
                xLabels={dateHistory}
                yLabels={priceHistory}
                name={props.coinInfo}
                />
          </Modal.Body>
             
        </Modal>
      
    </React.Fragment>
  );
};

export default MyModal;