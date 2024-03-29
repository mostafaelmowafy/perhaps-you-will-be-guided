import { useState } from "react";
import styles from "./question.module.css";
import { questionsData } from "./Data";

export default function Question() {
  const [step, setStep] = useState(1);
  const [answerIsOpen, setAnswerIsOpen] = useState(false);
  const [show, setShow] = useState("prophets");
  const singleData = questionsData.filter((q) => {
    return q.name === show;
  })[0].data;
  function preHandler() {
    if (step > 1) {
      setStep((s) => --s);
      questionsData[step - 2].active = true;
      setAnswerIsOpen(false);
    }
  }
  function nextHandler() {
    if (step < questionsData.length) {
      setStep((s) => ++s);
      questionsData[step].active = true;
      setAnswerIsOpen(false);
    }
  }
  function showHandler() {
    setAnswerIsOpen(!answerIsOpen);
  }
  //   function questionHandle(q) {
  //     setStep(q.id);
  //     q = { ...q, active: true };
  //   }
  return (
    <>
      <div className={styles.header}>
        <ul>
          <li
            className={show === "prophets" ? styles.active : ""}
            onClick={() => {
              setShow("prophets");
            }}
          >
            الأنبياء
          </li>
          <li
            className={show === "history" ? styles.active : ""}
            onClick={() => {
              setShow("history");
            }}
          >
            تاريخ
          </li>
          <li
            className={show === "jurisprudence" ? styles.active : ""}
            onClick={() => {
              setShow("jurisprudence");
            }}
          >
            فقه
          </li>
          <li
            className={show === "quran" ? styles.active : ""}
            onClick={() => {
              setShow("quran");
            }}
          >
            قران
          </li>
        </ul>
      </div>
      <div className={styles.container}>
        <div className={styles.steps}>
          <div className={styles.numbers}>
            {singleData.map((q) => {
              return (
                <div
                  key={q.id}
                  onClick={() => {
                    setStep(q.id);
                    q.active = true;
                  }}
                  className={q.active ? styles.active : undefined}
                >
                  {q.id}
                </div>
              );
            })}
          </div>
          <div className={styles.message}>
            <p>
              {step}: {singleData[step - 1].qes}
            </p>
          </div>
          <div className={styles.buttons}>
            <Button onClick={preHandler}>
              <span>⏮️</span>السابق
            </Button>
            <button
              onClick={showHandler}
              className={answerIsOpen ? styles.active : undefined}
            >
              الأجابة
            </button>
            <Button onClick={nextHandler}>
              التالي<span>⏭️</span>
            </Button>
          </div>
          {answerIsOpen && (
            <div className={styles.answer}>
              <h3 className={styles.ques_h3}>{singleData[step - 1].answer}</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
