pipeline {
  agent any

  options {
    timestamps()
  }

  environment {
    AWS_REGION = 'ap-southeast-7'
    EKS_CLUSTER = 'demo-eks'
    IMAGE_REPO = '176501510816.dkr.ecr.ap-southeast-7.amazonaws.com/demo-app'
    IMAGE_TAG  = "${BUILD_NUMBER}"
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
          docker build -t demo-app:${IMAGE_TAG} .
          docker tag demo-app:${IMAGE_TAG} ${IMAGE_REPO}:${IMAGE_TAG}
        '''
      }
    }

    stage('Push to ECR') {
      steps {
        sh '''
          aws ecr get-login-password --region ${AWS_REGION} \
          | docker login --username AWS --password-stdin ${IMAGE_REPO}
          docker push ${IMAGE_REPO}:${IMAGE_TAG}
        '''
      }
    }

    stage('Approval to Deploy') {
      steps {
        input message: "Deploy image ${IMAGE_TAG} to EKS?",
              ok: "Deploy"
      }
    }

    stage('Deploy to EKS') {
      steps {
        sh '''
          echo "Deploying image ${IMAGE_REPO}:${IMAGE_TAG} to EKS"

          # แทนค่า IMAGE_PLACEHOLDER แล้ว apply (ใส่ --validate=false ตรงนี้!)
          sed "s|IMAGE_PLACEHOLDER|${IMAGE_REPO}:${IMAGE_TAG}|" deployment.yaml \
          | kubectl apply --validate=false -f -

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

