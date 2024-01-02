import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import styles from './AgeWarning.module.css'

function AgeWarning() {
    return (
      <div className={styles['warning-label']}>  
      <ReportProblemIcon/>
        <p className={styles['text']} >  Wallet is old!</p>
      </div>
    );
  }
  
  export { AgeWarning };
  