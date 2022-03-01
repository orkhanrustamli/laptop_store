import classes from './style.module.scss'

export default function Loading() {
  return (
    <div className={classes.loadingContainer}>
      <div className={classes.skCubeGrid}>
        <div className={`${classes.skCube} ${classes.skCubeOne}`}></div>
        <div className={`${classes.skCube} ${classes.skCubeTwo}`}></div>
        <div className={`${classes.skCube} ${classes.skCubeThree}`}></div>
        <div className={`${classes.skCube} ${classes.skCubeFour}`}></div>
        <div className={`${classes.skCube} ${classes.skCubeFive}`}></div>
        <div className={`${classes.skCube} ${classes.skCubeSix}`}></div>
        <div className={`${classes.skCube} ${classes.skCubeSeven}`}></div>
        <div className={`${classes.skCube} ${classes.skCubeEight}`}></div>
        <div className={`${classes.skCube} ${classes.skCubeNine}`}></div>
      </div>
    </div>
  )
}
