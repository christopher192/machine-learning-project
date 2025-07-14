## Seldon Core Project
`Seldon Core` is an open-source platform for deploying, managing, and scaling machine learning models on `Kubernetes`. It enables teams to serve models from frameworks like TensorFlow, PyTorch, Scikit-learn, XGBoost, etc with following features. 

Key Features:
- Multi-framework support → Deploy models from different ML frameworks.
- Scalability → Leverages Kubernetes for autoscaling and load balancing.
- Advanced Routing → Supports A/B testing, canary deployments, and ensembles.
- Monitoring & Logging → Integrates with `Prometheus`, `Grafana`, and `Jaeger` for insights.
- Security → Supports authentication, authorization, and encrypted communication.

Example Flows:
1. Models are containerized as microservices.
2. `Seldon Core` deploys them as Kubernetes pods.
3. Users interact via `REST/gRPC APIs`.
4. Ingress controllers (Istio/Ambassador) route traffic.
5. Metrics/logs are collected for monitoring.

Use Cases:
1. AI/ML Model Serving in production environments.
2. A/B testing & Shadow Deployments for model validation.
3. Multi-Model Inference Pipelines for complex workflows.

### Seldon Core with Docker Desktop Kubernetes on Windows
To start `Seldon Core` with `Docker Desktop Kubernetes` on `Windows`, follow these steps:

- Step 1: Enable Kubernetes in Docker Desktop
    - Open Docker Desktop.
    - Go to "Settings" → "Kubernetes".
    - Check "Enable Kubernetes".
    - Check "Cluster settings" → "Kubeadm" & "Show system containers (advanced)".
    - Click "Apply & Restart".
    - Wait for Kubernetes to start. Verify by running, you will see a "Ready" status.
    ```
    kubectl get nodes
    ```

- Step 2: Install `Helm` (If Not Installed)
    - Run the following command in `PowerShell` as `Administrator`:
    ```
    choco install kubernetes-helm
    ```
- Then verify the installation:
    ```
    helm version
    ```

- Step 3: Install `Istio`
    - Install `Istio` with `Helm`.
    ```
    # add repo
    helm repo add istio https://istio-release.storage.googleapis.com/charts
    helm repo update

    # create the istio-system namespace
    kubectl create namespace istio-system

    # install the Istio base components
    helm install istio-base istio/base -n istio-system

    # install the Istio control plane (Istiod)
    helm install istiod istio/istiod -n istio-system --wait

    # install the Istio Ingress Gateway (needed for Seldon Core)
    helm install istio-ingress istio/gateway -n istio-system --wait

    # verify that Istio is running
    kubectl get pods -n istio-system
    ```
    - Guide for uninstallment.
    ```
    helm uninstall istio-ingress -n istio-system
    helm uninstall istiod -n istio-system
    helm uninstall istio-base -n istio-system
    kubectl delete namespace istio-system
    ```

- Step 4: Install `Seldon Core`
    - Since Docker Desktop Kubernetes works well with `Istio`, install it with:
    ```
    # create the seldon-system namespace
    kubectl create namespace seldon-system

    # add repo
    helm repo add seldon https://storage.googleapis.com/seldon-charts
    helm repo update

    # install
    helm install seldon-core seldon/seldon-core-operator --namespace seldon-system --set istio.enabled=true
    ```
    - Guide for uninstallement.
    ```
    helm uninstall seldon-core -n seldon-system
    kubectl delete namespace seldon-system
    ```

- Step 5: Port-Forward `Istio` Gateway
    - Run the following command to expose `Seldon Core` on `localhost:8003`:
    ```
    kubectl port-forward -n istio-system svc/istio-ingressgateway 8003:80
    ```

- Optional: Install `Ambassador` Instead of `Istio`
    - (Info to be added..)

### Seldon Core on Linux