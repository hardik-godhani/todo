import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toast: ToastrService) { }

  successMsg(title, msg) {
    this.toast.success(msg, title);
  }
  savedataMsg(msg) {
    this.toast.success(msg && msg != '' ? msg : 'Data has been saved successfully');
  }
  errorMsg(err) {
    if (err && err.error && err.error.message) {
      this.toast.error(err.error.message);
    } else {
      this.toast.error('Something went wrong, Please try again later..');
    }
  }
  warningMsg(title, msg) {
    this.toast.warning(msg, title);
  }
  infoMsg(title, msg) {
    this.toast.info(msg, title);
  }
  clearMsg(title, msg) {
    this.toast.clear(msg);
  }
}
