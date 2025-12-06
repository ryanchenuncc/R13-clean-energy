import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { DataService } from '../services/data';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './reports.html',
  styleUrls: ['./reports.css']
})
export class ReportsComponent implements OnInit, AfterViewInit {
  private chart: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit(): void {
    this.loadChart();
  }

  loadChart(): void {
    this.dataService.getChart2Data().subscribe({
      next: (data) => {
        const labels = data.map((item: any) => item.label);
        const values = data.map((item: any) => item.value);

        const ctx = document.getElementById('chart2') as HTMLCanvasElement;
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Annual Production (GWh)',
              data: values,
              backgroundColor: [
                'rgba(231, 76, 60, 0.7)',
                'rgba(230, 126, 34, 0.7)',
                'rgba(26, 188, 156, 0.7)'
              ],
              borderColor: [
                'rgba(231, 76, 60, 1)',
                'rgba(230, 126, 34, 1)',
                'rgba(26, 188, 156, 1)'
              ],
              borderWidth: 2
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Annual Production (GWh)'
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top'
              },
              title: {
                display: true,
                text: 'Annual Energy Production by Facility'
              }
            }
          }
        });
      },
      error: (error) => {
        console.error('Error loading chart data:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
