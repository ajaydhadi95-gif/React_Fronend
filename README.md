# 🚀 Booking App Frontend – CI/CD Deployment

A production-style frontend deployment project demonstrating an automated **CI/CD pipeline** using **GitHub, Jenkins, Docker, Docker Hub, Kubernetes, and AWS EKS**.

## 🏗️ Architecture

```text
Developer
    │
    ▼
 GitHub
    │
    ▼
 Jenkins
    │
    ├── Checkout
    ├── Docker Build
    ├── Docker Tag
    ├── Docker Push
    │
    ▼
 Docker Hub
    │
    ▼
 AWS EKS
    │
    ├── Deployment
    │      └── 2 Replicas
    │
    └── LoadBalancer
             │
             ▼
          Browser
```

## 🛠️ Technologies Used

* React
* Vite
* Git & GitHub
* Jenkins
* Docker
* Docker Hub
* Kubernetes
* AWS EKS
* AWS LoadBalancer
* Nginx
* Linux / Ubuntu

## 📁 Project Structure

```text
Booking_app_frontend/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── public/
├── deployment.yaml
├── Dockerfile
├── Jenkinsfile
├── package.json
├── package-lock.json
├── vite.config.js
├── .dockerignore
├── .gitignore
└── README.md
```

## 🐳 Docker

The application uses a **multi-stage Docker build**.

### Build image

```bash
docker build -t booking_frontend:latest .
```

### Run container

```bash
docker run -d -p 80:80 booking_frontend:latest
```

Open:

```text
http://localhost
```

## 🔄 Jenkins CI/CD Pipeline

The Jenkins pipeline automatically performs:

1. Checkout source code from GitHub
2. Build Docker image
3. Create a unique image tag using Jenkins `BUILD_NUMBER`
4. Tag the image as `latest`
5. Login to Docker Hub
6. Push versioned image to Docker Hub
7. Push `latest` image
8. Deploy application to Kubernetes
9. Update Kubernetes Deployment with the new image
10. Wait for successful rollout

### Docker Image Tags

For example, Jenkins Build #10 creates:

```text
ajaydhadi95/booking_frontend:10
ajaydhadi95/booking_frontend:latest
```

## ☸️ Kubernetes Deployment

The application is deployed using a Kubernetes Deployment with **2 replicas**.

```yaml
replicas: 2
```

This provides multiple running pods for better availability.

### Check pods

```bash
kubectl get pods -o wide
```

### Check deployment

```bash
kubectl get deployment
```

### Check service

```bash
kubectl get svc
```

## 🌐 Kubernetes Service

The application is exposed using an AWS LoadBalancer:

```yaml
type: LoadBalancer
```

Kubernetes creates an AWS LoadBalancer and exposes the frontend over HTTP port `80`.

## ☁️ AWS EKS

The Kubernetes application is deployed on **Amazon EKS**.

EKS provides the managed Kubernetes control plane while worker nodes run the application workloads.

### Verify EKS nodes

```bash
kubectl get nodes
```

### Verify application

```bash
kubectl get pods -o wide
```

## 🔁 Deployment Strategy

The Jenkins pipeline updates the Kubernetes image using:

```bash
kubectl set image deployment/booking-frontend \
booking-frontend=ajaydhadi95/booking_frontend:${BUILD_NUMBER}
```

Then it verifies the rollout:

```bash
kubectl rollout status deployment/booking-frontend
```

This enables version-based deployments such as:

```text
Build #8  → booking_frontend:8
Build #9  → booking_frontend:9
Build #10 → booking_frontend:10
```

## ↩️ Rollback

If a deployment has an issue, Kubernetes can rollback to the previous revision:

```bash
kubectl rollout undo deployment/booking-frontend
```

Check rollout history:

```bash
kubectl rollout history deployment/booking-frontend
```

## 🔐 Docker Hub Authentication

Jenkins uses a stored Docker Hub credential:

```text
credentialsId: dockerhub-credentials
```

The Docker Hub credential is stored securely in Jenkins Credentials rather than directly inside the Jenkinsfile.

## 📊 CI/CD Workflow

```text
Git Push
   │
   ▼
GitHub
   │
   ▼
Jenkins Trigger
   │
   ▼
Checkout
   │
   ▼
Docker Build
   │
   ▼
Docker Tag
   │
   ▼
Docker Hub
   │
   ▼
Kubernetes Deployment
   │
   ▼
Rolling Update
   │
   ▼
AWS LoadBalancer
   │
   ▼
Users
```

## 🎯 Key DevOps Concepts Demonstrated

* Source Code Management
* Git branching
* GitHub repository management
* CI/CD automation
* Jenkins Pipeline
* Docker image creation
* Docker image versioning
* Docker Hub registry
* Kubernetes Deployment
* Kubernetes Services
* Kubernetes rolling updates
* Kubernetes replicas
* AWS EKS
* AWS LoadBalancer
* Application rollback
* Infrastructure and deployment automation

## 🚀 Future Improvements

* Add automated testing
* Add SonarQube code quality analysis
* Add Kubernetes Ingress
* Add Helm charts
* Add Prometheus monitoring
* Add Grafana dashboards
* Add HTTPS with TLS
* Add GitHub webhook for automatic Jenkins builds
* Add separate Dev/Staging/Production environments

## 👨‍💻 Author

**Ajay Dhadi**

DevOps / Cloud Enthusiast

### Skills Demonstrated

`AWS` `EKS` `Kubernetes` `Docker` `Jenkins` `Git` `GitHub` `Linux` `Nginx` `CI/CD`

---

⭐ If you find this project useful, consider giving the repository a star!
