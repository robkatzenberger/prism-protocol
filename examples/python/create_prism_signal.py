from datetime import datetime, timezone
from uuid import uuid4


PRISM_VERSION = "prism_v0.1"


def utc_now_iso():
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def create_prism_signal(agent: str, summary: str) -> dict:
    return {
        "prism_id": str(uuid4()),
        "timestamp": utc_now_iso(),
        "agent": agent,
        "intent_summary": summary,
        "prism_version": PRISM_VERSION,
    }


if __name__ == "__main__":
    print(
        create_prism_signal(
            agent="my_app.backend.worker",
            summary="Sending notification email",
        )
    )
