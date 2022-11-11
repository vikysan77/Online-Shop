import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogBoxComponent implements OnInit {

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? ''),
    price: new FormControl(this.data?.price ?? ''),
    text: new FormControl(this.data?.text ?? ''),
    image: new FormControl(this.data?.image ?? ''),
    grade: new FormControl(this.data?.grade ?? ''),
    size: new FormControl(this.data?.size ?? ''),
    weight: new FormControl(this.data?.weight ?? ''),
    age: new FormControl(this.data?.age ?? ''),
  })

  isNew: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if(this.data) this.isNew = false
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit(){
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      text: this.myForm.value.texte,
      image: this.myForm.value.image,
      grade: this.myForm.value.grade,
      description: {
        size: this.myForm.value.size,
        weight: this.myForm.value.weight,
        age: this.myForm.value.age,
      }
    }
    //console.log(this.myForm.value)

    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {
  }

}
