# 数学公式示例

这是一个包含大量数学公式的 Markdown 文件。

## 1. 行内公式

质能方程是 $E = mc^2$。

勾股定理：$a^2 + b^2 = c^2$。

## 2. 块级公式

### 麦克斯韦方程组

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\left(\mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}\right)
\end{aligned}
$$

### 傅里叶变换

$$
\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x) e^{-2\pi i x \xi} \,dx
$$

### 矩阵运算

$$
\mathbf{A} = \begin{pmatrix}
a & b \\
c & d
\end{pmatrix}, \quad \det(\mathbf{A}) = ad - bc
$$

## 3. 复杂公式

泰勒级数展开：
$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^n
$$

欧拉恒等式：
$e^{i\pi} + 1 = 0$
