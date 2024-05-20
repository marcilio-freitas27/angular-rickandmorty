import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ChartUtil {

  backgroundColor: string[] = ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'];

  borderColor: string[] = ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'];

  responsiveOptions: any[] = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '1220px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '1100px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  basicOptions:any = {
    plugins: {
        legend: {
            labels: {
                color: ""
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                color: ""
            },
            grid: {
                color: "",
                drawBorder: false
            }
        },
        x: {
            ticks: {
                color: ""
            },
            grid: {
                color: "",
                drawBorder: false
            }
        }
    }
  }

  public gerarChart(labels:any[],label:string, data: any[]){
    return {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
          borderWidth: 1
        }
      ]
    };
  }
}
