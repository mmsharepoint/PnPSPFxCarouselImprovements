import * as React from 'react';
import { Carousel, CarouselButtonsLocation, CarouselButtonsDisplay } from '@pnp/spfx-controls-react/lib/Carousel';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import styles from './PnPCarouselAutoplay.module.scss';
import { IPnPCarouselAutoplayProps } from './IPnPCarouselAutoplayProps';
import { IPnPCarouselAutoplayState } from './IPnPCarouselAutoplayState';

export default class PnPCarouselAutoplay extends React.Component<IPnPCarouselAutoplayProps, IPnPCarouselAutoplayState> {
  private carouselInterval;
  private carouselElements = [
    <div id="1" key="1"><h1>Element 1</h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a mattis libero, nec consectetur neque. Suspendisse potenti. Fusce ultrices faucibus consequat. Suspendisse ex diam, ullamcorper sit amet justo ac, accumsan congue neque. Vestibulum aliquam mauris non justo convallis, id molestie purus sodales. Maecenas scelerisque aliquet turpis, ac efficitur ex iaculis et. Vivamus finibus mi eget urna tempor, sed porta justo tempus. Vestibulum et lectus magna. Integer ante felis, ullamcorper venenatis lectus ac, vulputate pharetra magna. Morbi eget nisl tempus, viverra diam ac, mollis tortor. Nam odio ex, viverra bibendum mauris vehicula, consequat suscipit ligula. Nunc sed ultrices augue, eu tincidunt diam.</div>,
    <div id="2" key="2"><h1>Element 2</h1>Quisque metus lectus, facilisis id consectetur ac, hendrerit eget quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut faucibus posuere felis vel efficitur. Maecenas et massa in sem tincidunt finibus. Duis sit amet bibendum nisi. Vestibulum pretium pretium libero, vel tincidunt sem vestibulum sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin quam lorem, venenatis id bibendum id, tempus eu nibh. Sed tristique semper ligula, vitae gravida diam gravida vitae. Donec eget posuere mauris, pharetra semper lectus.</div>,
    <div id="3" key="3"><h1>Element 3</h1>Pellentesque tempor et leo at tincidunt. Vivamus et leo sed eros vehicula mollis vitae in dui. Duis posuere sodales enim ut ultricies. Cras in venenatis nulla. Ut sed neque dignissim, sollicitudin tellus convallis, placerat leo. Aliquam vestibulum, leo pharetra sollicitudin pretium, ipsum nisl tincidunt orci, in molestie ipsum dui et mi. Praesent aliquam accumsan risus sed bibendum. Cras consectetur elementum turpis, a mollis velit gravida sit amet. Praesent non augue cursus, varius justo at, molestie lorem. Nulla cursus tellus quis odio congue elementum. Vivamus sit amet quam nec lectus hendrerit blandit. Duis ac condimentum sem. Morbi hendrerit elementum purus, non facilisis arcu bibendum vitae. Vivamus commodo tristique euismod.</div>,
    <div id="4" key="4"><h1>Element 4</h1>Proin semper egestas porta. Nullam risus nisl, auctor ac hendrerit in, dapibus quis ex. Quisque vitae nisi quam. Etiam vel sapien ut libero ornare rhoncus nec vestibulum dolor. Curabitur lacinia aliquam arcu. Proin ultrices risus velit, in vehicula tellus vehicula at. Sed ultrices et felis fringilla ultricies.</div>,
    <div id="5" key="5"><h1>Element 5</h1>Donec orci lorem, imperdiet eu nisi sit amet, condimentum scelerisque tortor. Etiam nec lacinia dui. Duis non turpis neque. Sed pellentesque a erat et accumsan. Pellentesque elit odio, elementum nec placerat nec, ornare in tortor. Suspendisse gravida magna maximus mollis facilisis. Duis odio libero, finibus ac suscipit sed, aliquam et diam. Aenean posuere lacus ex. Donec dapibus, sem ac luctus ultrices, justo libero tempor eros, vitae lacinia ex ante non dolor. Curabitur condimentum, ligula id pharetra dictum, libero libero ullamcorper nunc, eu blandit sem arcu ut felis. Nullam lacinia dapibus auctor.</div>
  ];

  public constructor(props) {
    super(props);
    this.state = {
      carouselElements: this.carouselElements,
      currentCarouselIndex: 0,
      currentCarouselElement: this.carouselElements[0],
      canMoveNext: false,
      canMovePrev: false
    };
  }

  public componentDidMount() {
    if (this.props.autoLoad) {
      this.carouselInterval = setInterval(() => {
        this.autoplayELements();
      }, this.props.autoLoadInterval*1000);
    }
  }

  public render(): React.ReactElement<IPnPCarouselAutoplayProps> {
    let dotNav = this.state.carouselElements.map((element, index) => {
      return <Icon iconName={this.state.currentCarouselIndex === index ? 'StatusCircleInner' : 'StatusCircleRing'} 
                    onClick={() => { this.triggerNextElement(index); }}
                    className={styles.dotNavIcon} />;
    });
    return (
      <div className={ styles.pnPCarouselAutoplay }>
        <Carousel
          buttonsLocation={CarouselButtonsLocation.bottom}
          buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}
          contentContainerStyles={styles.carouselContent}
          canMoveNext={this.state.canMoveNext}
          canMovePrev={this.state.canMovePrev}
          triggerPageEvent={this.triggerNextElement}
          element={this.state.currentCarouselElement}
        />
        <div className={styles.dotNavOuter}>
          <div className={styles.dotNavInner}>
            {this.props.dotNav &&
              dotNav}
          </div>
        </div>
      </div>
    );
  }

  private triggerNextElement = (index: number) => {
    if (index > this.state.carouselElements.length -1) { // Beyond last element? Start with 1st one
      index = 0;
    }
    if (index < 0) { // Before 1st element? Go on with last one
      index = this.state.carouselElements.length -1;
    }
    this.setState((prevState: IPnPCarouselAutoplayState, props: IPnPCarouselAutoplayProps) => {
      return {
        currentCarouselElement: this.state.carouselElements[index],
        currentCarouselIndex: index,
        canMoveNext: index < this.state.carouselElements.length -1,
        canMovePrev: index > 0
      };
    });
  }

  private autoplayELements = () => {
    setTimeout(() => {
      this.triggerNextElement(this.state.currentCarouselIndex + 1);
    }, 1000);
  }
}
