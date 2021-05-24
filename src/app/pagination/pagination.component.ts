import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  // @ts-ignore
  @Input() $currentIndex: BehaviorSubject<number>;
  // @ts-ignore
  @Input() $maxPage: BehaviorSubject<number>;
  // @ts-ignore
  @Input() getPageFunction: (index: number) => void;
  showLeftEllipsis = false;
  showRightEllipsis = false;
  currentIndex = 1;
  previousIndex = 1;
  maxPage = 1;
  indexBetween: any[] = [];
  left = 0;
  right = 7;

  constructor() { }

  ngOnInit(): void {
    this.getMax();
    this.$currentIndex.subscribe(value => {
      this.getPageFunction(value);
      this.currentIndex = value;
      if ( value === 1){
        this.previousIndex = this.currentIndex;
      }
    });
  }
  getMax(): void{
    this.$maxPage.subscribe( value => {
      if (value !== this.maxPage){
        const temp = [];
        for (let i = 2; i < value; i++) {
          temp.push(i);
        }
        this.indexBetween = temp;
        this.left = 0;
        this.right = Math.min(7, temp.length);
        this.currentIndex = 1;
        this.selectDeselect(this.currentIndex, this.currentIndex);
        this.maxPage = value;
      }
      this.selectDeselect(this.previousIndex, this.currentIndex);
      this.showRightEllipsis = this.maxPage > 10 && this.maxPage !== this.indexBetween[this.right] + 1;
      this.showLeftEllipsis = this.maxPage > 10 && this.indexBetween[this.left] - 1 !== 1;
    });
  }
  previous(): void{
    if (this.currentIndex > 1) {
      const next = this.currentIndex  - 1;
      this.previousIndex = this.currentIndex;
      this.$currentIndex.next(next);
      if (this.indexBetween[this.left] > next && next !== 1){
        this.right = this.left - 1;
        this.left = Math.max(this.left - 8, 0);
      }
    }
  }
  next(): void{
    if (this.currentIndex  < this.maxPage){
      const next = this.currentIndex  + 1;
      this.previousIndex = this.currentIndex;
      this.$currentIndex.next(next);
      if (this.indexBetween[this.right] < next  && this.right < this.indexBetween.length && next !== this.maxPage){
        this.left = this.right + 1;
        this.right = Math.min(this.right + 8, this.indexBetween.length - 1);
      }
    }
  }
  select(index: number): void{
    this.previousIndex = this.currentIndex;
    this.selectDeselect(this.currentIndex, index);
    this.$currentIndex.next(index);
    this.getPageFunction(index);
    this.currentIndex = index;
  }
  selectDeselect(previous: number, next: number): void{
    // @ts-ignore
    let element = document.getElementById(previous + '');
    if (element){
      const style = element.style;
      style.color = 'initial';
      style.borderColor = '#8AA0BD';
    }

    // @ts-ignore
    element = document.getElementById(next + '');
    if (element) {
      const style = element.style;
      style.color = '#408AF8';
      style.borderColor = '#408AF8';
    }
  }
}
