FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -r linux-musl-x64 --self-contained false -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-alpine
WORKDIR /app

# Install docker-cli
RUN apk update && apk add --no-cache docker-cli

COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "CourseCodesAPI.dll"]
