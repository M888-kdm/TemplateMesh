pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                cache(caches: [
                    arbitraryFileCache(path: 'node_modules', cacheName: "mesh_modules", cacheValidityDecidingFile: 'package-lock.json')
                ])
            }
        }
    }
}