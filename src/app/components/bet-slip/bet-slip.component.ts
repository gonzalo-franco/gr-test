import { Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import { NumberLotteryService } from "src/app/services/number-lottery.service";
import { Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-bet-slip",
  templateUrl: "./bet-slip.component.html",
  styleUrls: ["./bet-slip.component.scss"],
})
export class BetSlipComponent implements OnDestroy {
  //declare obsevable and variables
  @ViewChild("betform") betform?: ElementRef;
  subscription: Subscription;
  messages: number[] = [];
  resultArray: number[] = [];
  result: number = 0;
  winner: boolean | null = null;
  winnerscore: number = 0;
  totalscore: number = 1000;
  betForm = new FormGroup({});
  constructor(
    private NumberLottery: NumberLotteryService,
    private fb: FormBuilder
  ) {
    this.betForm = fb.group({
      // Adding the "bet" input to our FormGroup along with its min-max Validators.
      bet: ["5", [Validators.min(5), Validators.max(this.totalscore)]],
      selectedBall: ["", [Validators.required]],
    });
    //store recieved number
    this.subscription = this.NumberLottery.getMessage().subscribe((message) => {
      if (message) {
        this.messages.push(message);
        this.betForm.controls["selectedBall"].setValue(message);
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });
  }

  onSubmit() {
    this.winner = false;
    //generate a random number a check it with the selected one
    this.result = this.getRandomInt(9);
    this.resultArray.unshift(this.result);
    if (this.resultArray.length > 10) {
      this.resultArray = this.resultArray.slice(0, -1);
    }

    if (this.betForm.controls["selectedBall"].value == this.result) {
      this.winnerscore = this.betForm.controls["bet"].value * 1.5;
      this.totalscore = this.totalscore + this.winnerscore;
      this.winner = true;
    } else {
      this.totalscore = this.totalscore - this.betForm.controls["bet"].value;
    }
    //update validators
    this.betForm.controls["bet"].setValidators([
      Validators.min(5),
      Validators.max(this.totalscore),
    ]);
    this.betForm.controls["bet"].updateValueAndValidity();
  }

  //generate random numbers
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
