import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from "@angular/core";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
} from "rxjs";
import { NumberLotteryService } from "src/app/services/number-lottery.service";
import { fromEvent } from "rxjs";

@Component({
  selector: "app-ball-selector",
  templateUrl: "./ball-selector.component.html",
  styleUrls: ["./ball-selector.component.scss"],
})
export class BallSelectorComponent implements AfterViewInit {
  //Form observable
  @ViewChild("radioBtnForm") radioBtnForm?: ElementRef;
  mappedAndFilteredInput!: Observable<any>;
  radioButtonChange!: Observable<any>;

  numbers: any[] = [];

  constructor(
    private NumberLottery: NumberLotteryService,
    private renderer: Renderer2
  ) {
    //generate number array 0 - 9
    this.numbers = Array(10)
      .fill(0)
      .map((x, i) => i);
  }

  ngAfterViewInit() {
    //Send number by service when is selected in the form
    this.radioButtonChange = fromEvent(
      this.radioBtnForm?.nativeElement,
      "change"
    );
    this.mappedAndFilteredInput = this.radioButtonChange.pipe(
      map((e: any) => {
        return e.target!.value;
      }),
      debounceTime(100),
      distinctUntilChanged(),
      filter((value) => value != "" && value != undefined)
    );
    this.mappedAndFilteredInput.subscribe({
      next: (v) => this.NumberLottery.sendMessage(v),
      error: (e) => console.error(e),
      complete: () =>
        console.log("completed maping and filtering tag input term"),
    });
  }
}
