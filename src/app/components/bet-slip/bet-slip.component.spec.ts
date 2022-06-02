import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BetSlipComponent } from './bet-slip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
describe('BetSlipComponent', () => {
  let component: BetSlipComponent;
  let fixture: ComponentFixture<BetSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [BetSlipComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe retornar formulario valido', () => {
    const fixture = TestBed.createComponent(BetSlipComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    let bet = app.betForm.controls['bet'];
    let selectedBall = app.betForm.controls['selectedBall'];

    bet.setValue(5);
    selectedBall.setValue(0);

    expect(app.betForm.invalid).toBeFalse(); //TODO: ✔
  });
  it('Debe retornar formulario no valido', () => {
    const fixture = TestBed.createComponent(BetSlipComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    let bet = app.betForm.controls['bet'];
    let selectedBall = app.betForm.controls['selectedBall'];

    bet.setValue(5000);
    selectedBall.setValue(0);

    expect(app.betForm.invalid).toBeTrue(); //TODO: ✔
  });
});
