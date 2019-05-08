import os
from locust import HttpLocust, TaskSet, task
# 
# REQUIRE:
"""
    测试接口：
        member/
        order/
        blog/
"""
# HEADER
TEST_URL = 'http://127.0.0.1:8000/'
MIN_WAIT = 5000
MAX_WAIT = 15000

INTERFACE = [ 'api/member/', 'api/blog/', 'api/order/']

# CONTENT
class GoTask(TaskSet):
    """
        Locust Task Class
    """

    @task(1)
    def member(self):
        self.client.get(INTERFACE[0])

    @task(2)
    def blog(self):
        self.client.get(INTERFACE[1])

    @task(3)
    def order(self):
        self.client.get(INTERFACE[2])

class GoLocust(HttpLocust):
    """
        Locust Main Class
    """
    task_set = GoTask
    min_wait = MIN_WAIT
    max_wait = MAX_WAIT

# MAIN
run_command = 'locust -f '+ __file__ +' --host=' + TEST_URL
if __name__ == "__main__":
    os.system(run_command)