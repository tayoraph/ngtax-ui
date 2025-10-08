// src/app/config/toastr.config.ts
import { ToastrModule, GlobalConfig } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';

const toastrConfig: Partial<GlobalConfig> = {
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        progressBar: true,
        timeOut: 15000, // 15 seconds
        closeButton: true,
        iconClasses : {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
        progressAnimation: 'increasing', // Smooth progress animation
        tapToDismiss: 'true',            // Allow click to dismiss
        easing: 'ease-in-out',         // Smooth easing for animations
        easeTime: '300',                 // Speed of animation
        toastClass: 'ngx-toastr sleek-toast', // Add your custom CSS class
      },
    
};

export const toastrProvider = importProvidersFrom(
  ToastrModule.forRoot(toastrConfig)
);
