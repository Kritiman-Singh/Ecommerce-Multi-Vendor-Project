# =========================
# Stage 1: Build (Maven + Java 17)
# =========================
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# Pehle pom.xml copy karke dependencies cache kar lo (build fast hoga)
COPY pom.xml .
RUN mvn -q dependency:go-offline

# Phir source code copy karke package banao (tests skip, Render par time bachega)
COPY src ./src
RUN mvn -DskipTests package

# =========================
# Stage 2: Run (sirf JRE, halki image)
# =========================
FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

# Render PORT env deta hai, app application-prod.properties se usko padh lega
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
