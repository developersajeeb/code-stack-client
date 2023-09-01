import React from "react";

interface ICountUpProps {
  from: number;
  to: number;
  duration: number;
}

interface ICountUpState {
  val: number;
  duration: number;
}

/**
 * Count-Up Animation
 */
export default class CountUp extends React.Component<ICountUpProps, ICountUpState> {

  private startTimestamp: number | undefined;

  constructor(props: ICountUpProps | Readonly<ICountUpProps>) {
    super(props);

    let maxDuration = (props.to > props.from ? props.to - props.from : props.from - props.to) * 200;

    this.state = {
      val: props.from,

      // limit the animation duration for small numbers
      duration: maxDuration < props.duration ? maxDuration : props.duration
    }

    this.performAnimation = this.performAnimation.bind(this);
    requestAnimationFrame(this.performAnimation);
  }

  public render() {
    return this.state.val;
  }

 
  /**
   * Computing the easing effect
   * 
   * @param t - Current time/currnet step
   * @param d - Total animation time/steps
   * @param b - Starting position
   * @param c - Amount of change (end - start)
   */
  private computeEasing(t: number, d: number, b: number = 0, c: number = 1) {
    return (t == d) ? b + c : c * (-Math.pow(2, -20 * t / d) + 1) + b;
  }

  /**
   * Computing the current value using the computeEasing method.
   */
  private computeValue(progress: number) {
    if(this.props.from < this.props.to) {
    return this.props.from + Math.round(this.computeEasing(progress, this.state.duration, 0, (this.props.to - this.props.from)));
    } else {
      return this.props.from - Math.round(this.computeEasing(progress, this.state.duration, 0, (this.props.from - this.props.to)));   
    }
  }

  /**
   * This function is handling the animation frames
   */
  private performAnimation(timestamp: number) {

    // if this is the inital call, save current timestamp
    if (!this.startTimestamp) this.startTimestamp = timestamp;
    
    const progress = Math.ceil(timestamp - this.startTimestamp);

    if (progress < this.state.duration) {
      this.setState({ val: this.computeValue(progress) });
      requestAnimationFrame(this.performAnimation)
    } else {
      this.setState({ val: this.computeValue(this.state.duration) });
      this.startTimestamp = undefined;
    }
  }

}