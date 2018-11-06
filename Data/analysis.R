### Analysis of Kavanaugh Ford hearings chryons

# Import data
chryon_data <- read.csv(file.choose())

# Identify any duplicates
anyDuplicated(subset(chryon_data, chryon_data$msnbc!=""))
anyDuplicated(subset(chryon_data, chryon_data$cnn!=""))
anyDuplicated(subset(chryon_data, chryon_data$fox!=""))

# Create columns with 1's and 0's for the different chryons 
chryon_data$msnbc_bin <- ifelse(chryon_data$msnbc=="", 0, 1)
chryon_data$cnn_bin <- ifelse(chryon_data$cnn=="", 0, 1)
chryon_data$fox_bin <- ifelse(chryon_data$fox=="", 0, 1)

# Number of chryons overall 
sum(chryon_data$msnbc_bin) # 103
sum(chryon_data$cnn_bin) # 70
sum(chryon_data$fox_bin) # 63

# Number of chryons during Ford's hearing 
ford_data <- subset(chryon_data[14:269,])
sum(ford_data$msnbc_bin) # N=54, 52%
sum(ford_data$cnn_bin) # N=42, 60%
sum(ford_data$fox_bin) # N=22, 35%
# Ford's hearing duration: 4 hours and 15 minutes = 255 minutes (54% of Ford+Kavanaugh's durations)

# Number of chryons during Kavanaugh's hearing
kav_data <- subset(chryon_data[318:535,])
sum(kav_data$msnbc_bin) # N=37, 36%
sum(kav_data$cnn_bin) # N=23, 33%
sum(kav_data$fox_bin) # N=38, 60%
# Kavanaugh's hearing duration: 3 hours and 37 minutes = 217 minutes (46% of Ford+Kavanaugh's durations)

# In between, before, after the hearings 
other_data <- subset(chryon_data[c(1:14, 270:317, 535:nrow(chryon_data)),])
sum(other_data$msnbc_bin) # N=12, 12%
sum(other_data$cnn_bin) # N=6, 9%
sum(other_data$fox_bin) # N=3, 5%

# Number of chryons directly quoting Ford
nrow(subset(chryon_data, msnbc_bin==1 & grepl("FORD:", msnbc))) # 34 or 33% of all its chryons
nrow(subset(chryon_data, cnn_bin==1 & grepl("FORD:", cnn))) # 26 or 51% of all its chryons
nrow(subset(chryon_data, fox_bin==1 & grepl("FORD:", fox))) # 5 or 8% of all its chryons

# Number of chryons directly quoting Kavanaugh
nrow(subset(chryon_data, msnbc_bin==1 & grepl("KAVANAUGH:", msnbc))) # 29 or 28% of all its chryons
nrow(subset(chryon_data, cnn_bin==1 & grepl("KAVANAUGH:", cnn))) # 12 or 17% of all its chryons
nrow(subset(chryon_data, fox_bin==1 & grepl("KAVANAUGH:", fox))) # 22 or 35% of all its chryons
