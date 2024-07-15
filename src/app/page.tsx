import styles from "./styles/index.module.scss";

export default function Home(params: any) {
  console.log("====================================");
  console.log(params);
  console.log("====================================");
  return (
    <main className={styles["Container"]}>
      <div>
        <h1>welcome to home screen</h1>
      </div>
    </main>
  );
}
