export interface IPnPCarouselAutoplayState {
  carouselElements: JSX.Element[];
  currentCarouselIndex: number;
  currentCarouselElement: JSX.Element; 
  canMoveNext: boolean;
  canMovePrev: boolean; 
}