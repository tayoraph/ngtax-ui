import { NgModule } from "@angular/core";
import { LoaderComponent } from "./loader.component";
import { LoaderService } from "./loader.service";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoadingInterceptor } from "./loading.interceptor";
import { MaterialModule } from "src/app/material.module";

@NgModule({
    imports:[CommonModule, MaterialModule],
    exports:[LoaderComponent],
    declarations:[LoaderComponent],
    providers:[ LoaderService,
        {
          provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
        }
    ]
})
export class LoaderModule{}