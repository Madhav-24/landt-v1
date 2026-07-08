from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler(timezone='Asia/Kolkata')


def sync_system_telemetry() -> None:
    return None


def start_scheduler() -> None:
    if not scheduler.running:
        scheduler.add_job(sync_system_telemetry, 'interval', minutes=5, id='telemetry-sync', replace_existing=True)
        scheduler.start()
