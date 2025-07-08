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

        stage('Create .env file') {
            steps {
                echo "Creating .env file ..."
                script {
                    writeFile file: '.env', text: '''
                        MONGO_URI=mongodb://localhost:27017/eco
                        NODE_ENV=production
                        JWT_SECRET=mysecret
                        PORT=3001
                    '''
                }
            }
        }

        stage('Install dependencies') {
            steps {
                echo 'Installing dependencies ...'
                sh 'npm install'
                sh 'npm install --save-dev @types/express @types/multer'
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
                sh '''
                    pm2 startOrRestart ecosystem.config.js --env production
                '''
            }
        }
    }

    post {
        always {
            echo 'Saving PM2 process list...'
            sh 'pm2 save'
        }
    }
}
