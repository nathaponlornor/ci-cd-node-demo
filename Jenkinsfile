pipeline {
  agent any

  options {
    timestamps()
  }

  environment {
    AWS_REGION = 'ap-southeast-7'
    EKS_CLUSTER = 'demo-eks'
  }

  stages {

    stage('Clone Repo') {
      steps {
        git branch: 'main',
            url: 'https://github.com/nathaponlornor/ci-cd-node-demo.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          docker build -t demo-app:latest .
        '''
      }
    }

    stage('Run Tests') {
      steps {
        sh '''
          echo "No test for now – pass"
        '''
      }
    }

    stage('Approval to Deploy') {
      steps {
        input message: 'Approve deployment to EKS?',
              ok: 'Deploy'
      }
    }

    stage('Deploy to EKS') {
      steps {
        sh '''
          echo "Deploying to EKS..."

          kubectl apply --validate=false -f deployment.yaml
          kubectl apply --validate=false -f service.yaml

          kubectl rollout status deployment/demo-app
        '''
      }
    }
  }

  post {
    success {
      echo '✅ Deployment to EKS completed successfully'
    }
    failure {
      echo '❌ Deployment failed'
    }
  }
}

