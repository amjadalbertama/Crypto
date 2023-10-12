import { Component } from '@angular/core';

@Component({
  selector: 'app-validation-account',
  templateUrl: './validation-account.component.html',
  styleUrls: ['./validation-account.component.scss']
})
export class ValidationAccountComponent {
  ktpFileName!: string;

  updateFileName(event:any) {
    const file = event.target.files[0];
    this.ktpFileName = file.name;
  }

  selectKtpFile() {
    document.getElementById("ktpFile")!.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const fileName = file.name;
    document.getElementById("ktpName")!.setAttribute('value', fileName);
  }

  selectKkFile() {
    document.getElementById("kkFile")!.click();
  }

  onFileKkSelected(event: any) {
    const file: File = event.target.files[0];
    const fileName = file.name;
    document.getElementById("kkName")!.setAttribute('value', fileName);
  }

  selectLicenseFile() {
    document.getElementById("licenseFile")!.click();
  }

  onFileLicenseSelected(event: any) {
    const file: File = event.target.files[0];
    const fileName = file.name;
    document.getElementById("licenseName")!.setAttribute('value', fileName);
  }
}
