import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SnotifyPosition, SnotifyService, SnotifyToastConfig } from 'ng-snotify';


@Injectable()
export class SnotifyHelperService {

  private readonly style = 'material';

  private readonly position: SnotifyPosition = SnotifyPosition.centerCenter;

  public constructor(private snotifyService: SnotifyService,
                     @Inject('SnotifyToastConfig') public snotifyDefaultCfg: SnotifyToastConfig) {
  }

  public getStyle(): string {
    return this.style;
  }

  /*
  Change global configuration
   */
  public getConfig(): SnotifyToastConfig {
    const stotifyCfg: SnotifyToastConfig = { ...this.snotifyDefaultCfg };
    stotifyCfg.position = this.position;
    return stotifyCfg;
  }

  public onSuccess(body: string, title: string) {
    this.snotifyService.success(body, title, this.getConfig());
  }

  public onInfo(body: string, title: string) {
    this.snotifyService.info(body, title, this.getConfig());
  }

  public onError(body: string, title: string) {
    this.snotifyService.error(body, title, this.getConfig());
  }

  public onWarning(body: string, title: string) {
    this.snotifyService.warning(body, title, this.getConfig());
  }

  public onSimple(body: string, title: string) {

    // const icon = `assets/custom-svg.svg`;
    const icon = `https://placehold.it/48x100`;

    this.snotifyService.simple(body, title, {
      ...this.getConfig(),
      icon: icon
    });
  }

  public onAsyncLoading(body: string, title: string) {
    const errorAction = Observable.create(observer => {
      setTimeout(() => {
        observer.error({
          title: 'Error',
          body: 'Example. Error 404. Service not found',
        });
      }, 2000);
    });

    const successAction = Observable.create(observer => {
      setTimeout(() => {
        observer.next({
          body: 'Still loading.....',
        });
      }, 2000);

      setTimeout(() => {
        observer.next({
          title: 'Success',
          body: 'Example. Data loaded!',
          config: {
            closeOnClick: true,
            timeout: 5000,
            showProgressBar: true
          }
        });
        observer.complete();
      }, 5000);
    });

    /*
      You should pass Promise or Observable of type Snotify to change some data or do some other actions
      More information how to work with observables:
      https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/create.md
     */
    const { timeout, ...config } = this.getConfig(); // Omit timeout
    this.snotifyService.async('This will resolve with error', 'Async', errorAction, config);
    this.snotifyService.async('This will resolve with success', successAction, config);
    this.snotifyService.async('Called with promise', 'Error async',
      new Promise((resolve, reject) => {
        setTimeout(() => reject({
          title: 'Error!!!',
          body: 'We got an example error!',
          config: {
            closeOnClick: true
          }
        }), 1000);
        setTimeout(() => resolve(), 1500);
      }), config);
  }

  public onConfirmation(body: string, title: string) {
    /*
    Here we pass an buttons array, which contains of 2 element of type SnotifyButton
     */
    const { timeout, closeOnClick, ...config } = this.getConfig(); // Omit props what i don't need
    this.snotifyService.confirm(body, title, {
      ...config,
      buttons: [
        { text: 'Yes', action: () => console.log('Clicked: Yes'), bold: false },
        { text: 'No', action: () => console.log('Clicked: No') },
        {
          text: 'Later', action: (toast) => {
            console.log('Clicked: Later');
            this.snotifyService.remove(toast.id);
          }
        },
        {
          text: 'Close', action: (toast) => {
            console.log('Clicked: Close');
            this.snotifyService.remove(toast.id);
          }, bold: true
        },
      ]
    });
  }

  public onPrompt(body: string, title: string) {
    /*
     Here we pass an buttons array, which contains of 2 element of type SnotifyButton
     At the action of the first button we can get what user entered into input field.
     At the second we can't get it. But we can remove this toast
     */
    const { timeout, closeOnClick, ...config } = this.getConfig(); // Omit props what i don't need
    this.snotifyService.prompt(body, title, {
      ...config,
      buttons: [
        { text: 'Yes', action: (toast) => console.log('Said Yes: ' + toast.value) },
        {
          text: 'No', action: (toast) => {
            console.log('Said No: ' + toast.value);
            this.snotifyService.remove(toast.id);
          }
        },
      ],
      placeholder: 'Enter "ng-snotify" to validate this input' // Max-length = 40
    }).on('input', (toast) => {
      console.log(toast.value)
      toast.valid = !!toast.value.match('ng-snotify');
    });
  }

  public onHtml(): void {
    const html = `<div class="snotifyToast__title"><b>Html Bold Title</b></div>
    <div class="snotifyToast__body"><i>Html</i> <b>toast</b> <u>content</u></div>`;
    this.snotifyService.html(html, this.getConfig());
  }


  public onClear(): void {
    this.snotifyService.clear();
  }

}
