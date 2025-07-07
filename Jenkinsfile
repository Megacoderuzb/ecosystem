pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        MONGO_URI = 'mongodb://localhost:27017/eco'
    }

    stages {
        stage('Checkout') {
            steps {
            echo "Checkout is in process ..."
                git branch: 'main', url: 'https://github.com/Megacoderuzb/ecosystem.git'
            }
        }

        stage('Install dependencies') {
            steps {
            echo "Installing dependencies ..."
                sh 'npm install'
            }
        }

        stage('Build project') {
            steps {
            echo "Build stage is in process ..."
                sh 'npm run build'
            }
        }

        stage('Start with PM2') {
            steps {
                echo "Start with PM2"
                sh 'pm2 startOrRestart ecosystem.config.js --env production'
            }
        }
    }

    post {
        always {
            sh 'pm2 save'  // PM2 holatini saqlab qo'yish
        }
    }
}
