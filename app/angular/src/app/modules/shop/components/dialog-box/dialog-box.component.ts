import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  myForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    text: new FormControl(''),
    image: new FormControl(''),
    grade: new FormControl(''),
    size: new FormControl(''),
    weight: new FormControl(''),
    age: new FormControl(''),
  })

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.data = {
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
