pipeline {
  agent { label 'dockerhost' }

  environment {
    CI = 'true'
    K8S_RELEASE_NAME = "kiva-ui"
    K8S_NAMESPACE_PREFIX = "kiva-marketplace"
    K8S_CREDENTIALS_PREPROD = "kivadev-k8s-config"
    AWS_CREDENTIALS_PREPROD = "jenkins-ci-marketplace-dev"
    DOCKER_REPO_NAME = "kiva/ui"
    TAG_NAME = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
    TAGGED_IMAGE_NAME = "${DOCKER_REPO_NAME}:${TAG_NAME}"
    // simple when { tag matches "v*" } won't work due to current conflict with core and github plugin
    // Using env var string to boolean conversion works for now, but can be simpler if this issue is resolved
    QA_DEPLOY = env.TAG_NAME.toString().matches("^release-.*")
    PROD_DEPLOY = env.TAG_NAME.toString().matches("^v.*")
    TIMESTAMP = "${currentBuild.startTimeInMillis}"
  }

  stages {
    stage('Build_Docker_Image') {
      when {
        not {
          branch 'test'
        }
      }
      environment {
        TAG_NAME = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
      }
      steps {
        withDockerRegistry([ credentialsId: "kivapush_docker", url: ""]) {
          sh "docker build -t ${TAGGED_IMAGE_NAME} -f Dockerfile.jenkins . --build-arg TAG_NAME=${TAG_NAME} --pull --no-cache"
        }
      }
    }

    stage('Build_Docker_Image_N16') {
      when {
        branch 'test'
      }
      environment {
        TAG_NAME = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
      }
      steps {
        withDockerRegistry([ credentialsId: "kivapush_docker", url: ""]) {
          sh "docker build -t ${TAGGED_IMAGE_NAME} -f Dockerfile.jenkins-n16 . --build-arg TAG_NAME=${TAG_NAME} --pull --no-cache"
        }
      }
    }

    // TODO: What addition tests/validations would we like in this flow?
    // stage('Run_Tests') {
    //   environment {
    //     foo = "bar"
    //     blah = "blahblah"
    //   }
    //   steps {
    //     echo "Add tests here.  Verify docker image functions as expected"
    //     echo "May need to add some additional containers, etc. to run memcached or other dependencies"
    //     echo "Or possibly run dependencies on jenkins nodes"
    //   }
    // }

    stage('Publish_Docker_Image') {
      steps {
        withDockerRegistry([ credentialsId: "kivapush_docker", url: ""]) {
          sh "docker push ${TAGGED_IMAGE_NAME}"
        }
      }
    }

    // Primary automated Dev Deployment
    stage('UI Kubernetes Dev Deployment') {
      when {
        branch 'master'
      }
      steps {
        echo "Deploying to development Kubernetes cluster..."
        withKubeConfig([credentialsId: "${K8S_CREDENTIALS_PREPROD}"]) {
          withAWS([credentials: "${AWS_CREDENTIALS_PREPROD}"]) {
            withCredentials([string(credentialsId: 'vpn-ips', variable: 'ALLOWED_IPS')]) {
              sh "helm3 upgrade --install ${K8S_RELEASE_NAME} ./deploy/charts --namespace ${K8S_NAMESPACE_PREFIX}-dev --values ./deploy/dev/values.yaml --set image.tag=${TAG_NAME} --set-string allowed_ips=\"${ALLOWED_IPS}\""
            }
          }
        }
      }
    }

    // Dev is automatically deployed with each master merge
    // This additional "dev" stage allows us to override Ui with the contents of a branch named "dev"
    stage('UI Kubernetes Dev OVERRIDE Deployment') {
      when {
        branch 'dev'
      }
      steps {
        echo "Deploying to development Kubernetes cluster..."
        withKubeConfig([credentialsId: "${K8S_CREDENTIALS_PREPROD}"]) {
          withAWS([credentials: "${AWS_CREDENTIALS_PREPROD}"]) {
            withCredentials([string(credentialsId: 'vpn-ips', variable: 'ALLOWED_IPS')]) {
              sh "helm3 upgrade --install ${K8S_RELEASE_NAME} ./deploy/charts --namespace ${K8S_NAMESPACE_PREFIX}-dev --values ./deploy/dev/values.yaml --set image.tag=${TAG_NAME} --set-string allowed_ips=\"${ALLOWED_IPS}\""
            }
          }
        }
      }
    }

    // Primary automated Stage Deployment
    stage('UI Kubernetes Stage Deployment') {
      when {
        branch 'master'
      }
      steps {
        echo "Deploying to stage Kubernetes cluster..."
        withKubeConfig([credentialsId: "${K8S_CREDENTIALS_PREPROD}"]) {
          withAWS([credentials: "${AWS_CREDENTIALS_PREPROD}"]) {
            withCredentials([string(credentialsId: 'vpn-ips', variable: 'ALLOWED_IPS')]) {
              sh "helm3 upgrade --install ${K8S_RELEASE_NAME} ./deploy/charts --namespace ${K8S_NAMESPACE_PREFIX}-stage --values ./deploy/stage/values.yaml --set image.tag=${TAG_NAME} --set-string allowed_ips=\"${ALLOWED_IPS}\""
            }
          }
        }
      }
    }

    // Stage is automatically deployed with each master merge
    // This additional "stage" allows us to override Ui with the contents of a branch named "stage"
    stage('UI Kubernetes Stage OVERRIDE Deployment') {
      when {
        branch 'stage'
      }
      steps {
        echo "Deploying to stage Kubernetes cluster..."
        withKubeConfig([credentialsId: "${K8S_CREDENTIALS_PREPROD}"]) {
          withAWS([credentials: "${AWS_CREDENTIALS_PREPROD}"]) {
            withCredentials([string(credentialsId: 'vpn-ips', variable: 'ALLOWED_IPS')]) {
              sh "helm3 upgrade --install ${K8S_RELEASE_NAME} ./deploy/charts --namespace ${K8S_NAMESPACE_PREFIX}-stage --values ./deploy/stage/values.yaml --set image.tag=${TAG_NAME} --set-string allowed_ips=\"${ALLOWED_IPS}\""
            }
          }
        }
      }
    }

    // This "test" allows us to manually control deployments to the test env by updating the "test" branch
    stage('UI Kubernetes Test OVERRIDE Deployment') {
      when {
        branch 'test'
      }
      steps {
        echo "Deploying to development Kubernetes cluster..."
        withKubeConfig([credentialsId: "${K8S_CREDENTIALS_PREPROD}"]) {
          withAWS([credentials: "${AWS_CREDENTIALS_PREPROD}"]) {
            withCredentials([string(credentialsId: 'vpn-ips', variable: 'ALLOWED_IPS')]) {
              sh "helm3 upgrade --install ${K8S_RELEASE_NAME} ./deploy/charts --namespace ${K8S_NAMESPACE_PREFIX}-test --values ./deploy/test/values.yaml --set image.tag=${TAG_NAME} --set-string allowed_ips=\"${ALLOWED_IPS}\""
            }
          }
        }
      }
    }

    // Primary Automated QA Deployment
    stage('UI Kubernetes QA Deployment') {
      when {
         expression { QA_DEPLOY.toBoolean() }
      }
      steps {
        echo "Deploying to development Kubernetes cluster..."
        withKubeConfig([credentialsId: "${K8S_CREDENTIALS_PREPROD}"]) {
          withAWS([credentials: "${AWS_CREDENTIALS_PREPROD}"]) {
            withCredentials([string(credentialsId: 'vpn-ips', variable: 'ALLOWED_IPS')]) {
              sh "helm3 upgrade --install ${K8S_RELEASE_NAME} ./deploy/charts --namespace ${K8S_NAMESPACE_PREFIX}-qa --values ./deploy/qa/values.yaml --set image.tag=${TAG_NAME} --set-string allowed_ips=\"${ALLOWED_IPS}\""
            }
          }
        }
      }
    }

    // QA is automatically deployed with alterations to the current release-* branch
    // This additional qa stage allows us to override Ui with the contents of a branch named "qa"
    stage('UI Kubernetes QA OVERRIDE Deployment') {
      when {
         branch 'qa'
      }
      steps {
        echo "Deploying to development Kubernetes cluster..."
        withKubeConfig([credentialsId: "${K8S_CREDENTIALS_PREPROD}"]) {
          withAWS([credentials: "${AWS_CREDENTIALS_PREPROD}"]) {
            withCredentials([string(credentialsId: 'vpn-ips', variable: 'ALLOWED_IPS')]) {
              sh "helm3 upgrade --install ${K8S_RELEASE_NAME} ./deploy/charts --namespace ${K8S_NAMESPACE_PREFIX}-qa --values ./deploy/qa/values.yaml --set image.tag=${TAG_NAME} --set-string allowed_ips=\"${ALLOWED_IPS}\""
            }
          }
        }
      }
    }

    // Primary Automated PROD Deployment
    stage('UI Kubernetes PROD Deployment') {
      when {
         expression { PROD_DEPLOY.toBoolean() }
      }
      steps {
        echo "Deploying to Production Kubernetes cluster..."
        withKubeConfig([credentialsId: "kiva-k8s-config", contextName: "marketplace-prod"]) {
          withAWS([credentials: "jenkins-ci-marketplace-prod"]) {
            sh "helm3 upgrade --install --wait ${K8S_RELEASE_NAME} ./deploy/charts --namespace ${K8S_NAMESPACE_PREFIX} --values ./deploy/prod/values.yaml --set image.tag=${TAG_NAME}"
          }
        }
      }
    }

  }
}
