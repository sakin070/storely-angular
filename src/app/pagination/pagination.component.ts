import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit  {

  // @ts-ignore
  @Input() $currentIndex: BehaviorSubject<number>;
  // @ts-ignore
  @Input() $maxPage: BehaviorSubject<number>;
  // @ts-ignore
  @Input() getPageFunction: (index: number) => void;
  currentEight: number[] = [];
  showLeftEllipsis = false;
  showRightEllipsis = false;
  currentIndex = 1;
  previousIndex = 1;
  nextIndex = 1;
  maxPage = 1;

  constructor() { }

  ngOnInit(): void {
    this.getMax();
    this.createCurrentEight();
  }

  getMax(): void{
    this.$maxPage.subscribe( value => {
      this.maxPage = value;
      const temp: number[] = [];
      let index = this.currentIndex === 1 ? this.currentIndex + 1 : this.currentIndex ;
      if ((index + 8) >= this.maxPage  && this.maxPage > 10 ){
        index = this.maxPage - 8;
      }
      for (let i = index; i < index + 8 && (index + 8) <= this.maxPage; i++) {
        temp.push(i);
      }
      this.currentEight = temp;
      this.showRightEllipsis = this.currentIndex !== this.maxPage && this.maxPage - temp[temp.length - 1] > 1;
      this.showLeftEllipsis = this.currentIndex !== 1 && temp[0] - 1 > 1;
      this.selectDeselect(this.currentIndex, 1);
    } );
  }
  createCurrentEight(): void{
    this.$currentIndex.subscribe(value => {
      const temp: number[] = [];
      this.currentIndex = value;
      if (value === 1) {
        this.previousIndex = 1;
        this.nextIndex = 1;
        this.selectDeselect(this.currentIndex, 1);
      }
      let index = value === 1 ? value + 1 : value ;
      if ((index + 8) >= this.maxPage  && this.maxPage > 10 ){
        index = this.maxPage - 8;
      }
      for (let i = index; i < index + 8 && (index + 8) <= this.maxPage; i++) {
        temp.push(i);
      }
      this.currentEight = temp;
      this.getPageFunction(value);
      this.showRightEllipsis = value !== this.maxPage && this.maxPage - temp[temp.length - 1] > 1;
      this.showLeftEllipsis = value !== 1 && temp[0] - 1 > 1;
    });
  }
  previous(): void{
    if (this.currentIndex > 1) {
      const next = this.currentIndex  - 1;
      this.$currentIndex.next(this.currentIndex - 1);
      this.previousIndex = next + 1;
      this.nextIndex = next;
    }
  }
  next(): void{
    if (this.currentIndex  < this.maxPage){
      const next = this.currentIndex  + 1;
      this.$currentIndex.next(this.currentIndex  + 1);
      this.previousIndex = next - 1;
      this.nextIndex = next;
    }
  }
  select(index: number): void{
    this.previousIndex = this.currentIndex;
    this.nextIndex = index;
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
